import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidate, useDeleteCandidate, useResendNotification } from '../../hooks';
import { Loading, EmptyState, Button, Modal } from '../../components/ui';
import { TierBadge } from '../../components/candidate';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: candidate, isLoading, error } = useCandidate(id!);
  const { mutate: deleteCandidate, isPending: isDeleting } = useDeleteCandidate();
  const { mutate: resendNotification, isPending: isResending } = useResendNotification();

  if (isLoading) {
    return <Loading fullScreen text="Loading candidate details..." />;
  }

  if (error || !candidate) {
    return (
      <EmptyState
        title="Candidate not found"
        description="The candidate you're looking for doesn't exist or has been removed."
        action={{
          label: 'Back to Candidates',
          onClick: () => navigate('/admin/candidates'),
        }}
      />
    );
  }

  const handleDelete = () => {
    deleteCandidate(candidate._id, {
      onSuccess: () => {
        navigate('/admin/candidates');
      },
    });
  };

  const handleResendNotification = () => {
    resendNotification(candidate._id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/candidates')}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {candidate.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-all">
              {candidate.email}
            </p>
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
          className="w-full sm:w-auto"
        >
          Delete Candidate
        </Button>
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Full Name" value={candidate.name} />
          <InfoField label="Email" value={candidate.email} />
          <InfoField label="Phone" value={candidate.phone || 'Not provided'} />
          <InfoField label="Location" value={candidate.location || 'Not provided'} />
          <InfoField
            label="Registration Date"
            value={new Date(candidate.createdAt).toLocaleDateString()}
          />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned Tier</p>
            <TierBadge tier={candidate.assignedTier} />
          </div>
        </div>
      </div>

      {/* Assessment Responses */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Assessment Responses
        </h2>
        <div className="space-y-4">
          {candidate.assessmentResponses.map((response, index) => (
            <div key={response.questionId} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {index + 1}. {response.question}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-4">
                {String(response.answer)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Email Notification
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Status:{' '}
              <span
                className={`font-semibold ${
                  candidate.notificationSent
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-yellow-600 dark:text-yellow-400'
                }`}
              >
                {candidate.notificationSent ? 'Sent' : 'Pending'}
              </span>
            </p>
          </div>
          <Button
            onClick={handleResendNotification}
            isLoading={isResending}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {candidate.notificationSent ? 'Resend Notification' : 'Send Notification'}
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Candidate"
        footer={
          <div className="flex gap-4 justify-end">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete <strong>{candidate.name}</strong>?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-base text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};
