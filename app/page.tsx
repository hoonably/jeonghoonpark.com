import { getProjectsAction, getTeachingAction, getPublicationsAction } from "./actions";
import HomeClient from "@/components/HomeClient";

// Force static data fetching/caching if preferred, but for now we follow the existing pattern
export default async function Home() {
  const projectsList = await getProjectsAction();
  const teachingList = await getTeachingAction();
  const publicationsList = await getPublicationsAction();

  return (
    <HomeClient 
      projectsList={projectsList}
      teachingList={teachingList}
      publicationsList={publicationsList}
    />
  );
}
