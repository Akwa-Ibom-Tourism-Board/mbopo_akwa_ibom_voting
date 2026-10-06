import { Navigate, Route, Routes } from "react-router-dom";
import { Container, PageSection, PageShell, StateMessage } from "@/shared/components";
import { PictureNewsDetailPage, PictureNewsListPage } from "@/features/picture-news/pages";
import {
  CandidateDetailPage,
  CandidatesPage,
  VoteConfirmationPage,
  VotePurchasePage,
} from "@/features/voting/pages";
import { SponsorsPage } from "@/features/sponsors/pages";

function NotFoundPage() {
  return (
    <PageSection $clearHeader>
      <Container $maxWidth={720}>
        <StateMessage
          title="Page not found"
          message="The page you are looking for does not exist."
          actionTo="/picture-news"
          actionLabel="Back to home"
        />
      </Container>
    </PageSection>
  );
}

export function AppRoutes() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Navigate to="/picture-news" replace />} />
        <Route path="/picture-news" element={<PictureNewsListPage />} />
        <Route path="/picture-news/:id" element={<PictureNewsDetailPage />} />
        <Route path="/voting" element={<CandidatesPage />} />
        <Route path="/voting/:candidateId" element={<CandidateDetailPage />} />
        <Route path="/voting/:candidateId/vote" element={<VotePurchasePage />} />
        <Route path="/voting/:candidateId/vote/confirmation" element={<VoteConfirmationPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageShell>
  );
}
