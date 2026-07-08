import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
}

export interface PostData extends PostMetadata {
  contentHtml: string;
}

export function getSortedPostsData(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // Skip drafts
      if (matterResult.data.draft === true) {
        return null;
      }

      return {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        description: matterResult.data.description || '',
        readingTime: matterResult.data.readingTime || '',
      } as PostMetadata;
    })
    .filter((post): post is PostMetadata => post !== null);

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // Do not load dynamic post data if it is a draft
    if (matterResult.data.draft === true) {
      return null;
    }
    
    // Parse Markdown to HTML
    const rawHtml = await marked.parse(matterResult.content);

    return {
      slug,
      contentHtml: rawHtml,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      description: matterResult.data.description || '',
      readingTime: matterResult.data.readingTime || '',
    };
  } catch (error) {
    console.error(`Error loading post data for slug ${slug}:`, error);
    return null;
  }
}
