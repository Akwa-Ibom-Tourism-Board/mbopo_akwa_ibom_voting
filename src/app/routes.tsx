import { Navigate, Route, Routes } from "react-router-dom";
import { PageShell } from "@/shared/components";
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
    <PageShell>
      <div
        style={{
          maxWidth: 740,
          margin: "160px auto 80px",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: 16 }}>Page not found</h1>
        <p style={{ fontSize: "1.125rem", color: "#6B7280" }}>
          The page you are looking for does not exist.
        </p>
      </div>
    </PageShell>
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
        <Route
          path="/voting/:candidateId/vote/confirmation"
          element={<VoteConfirmationPage />}
        />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageShell>
  );
}
