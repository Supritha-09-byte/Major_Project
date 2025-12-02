import { getAssessments } from "@/actions/interview";
import InterviewView from "./interview-view";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();
  return <InterviewView assessments={assessments} />;
}
