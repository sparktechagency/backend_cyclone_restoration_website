import { saveAndGiveRefinedUrl } from '../../helpers/saveAndGiveRefinedLink';

export const saveMultipleFileAndGiveLink = async (
  files: any,
  pathName: string
) => {
  const arrayOfLinks: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const singleFile = files[i];
    const fileLink = await saveAndGiveRefinedUrl(singleFile, pathName);
    arrayOfLinks.push(fileLink);
  }
  return arrayOfLinks;
};
