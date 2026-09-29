import fs from 'fs';
import path from 'path';

const RESUME_FILENAME = 'resume/resume.pdf';
const resumePath = path.join(process.cwd(), 'public', RESUME_FILENAME);

export const RESUME_HREF = `/${RESUME_FILENAME}`;

/**
 * True when a resume has actually been uploaded to /public.
 * Links are only rendered when this passes, so the nav never points at a 404.
 */
export function hasResume(): boolean {
  try {
    return fs.existsSync(resumePath);
  } catch {
    return false;
  }
}
