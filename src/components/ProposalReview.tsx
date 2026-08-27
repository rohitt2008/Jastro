import { useStore } from '../store/useStore';

export const ProposalReview = () => {
  const { pendingAiProposals, acceptProposal, rejectProposal } = useStore();
  const proposalIds = Object.keys(pendingAiProposals);

  if (proposalIds.length === 0) return null;

  return (
    <div className="mt-6 border-t border-purple-200 pt-4 bg-purple-50 p-3 rounded-md">
      <h3 className="text-sm font-semibold text-purple-800 mb-2">Pending AI Proposals ({proposalIds.length})</h3>
      
      <div className="space-y-3">
        {proposalIds.map(id => {
          const proposal = pendingAiProposals[id];
          return (
            <div key={id} className="bg-white p-2 rounded shadow-sm border border-purple-100 text-xs">
              <div className="font-medium text-gray-800 mb-1">Element: {id} ({proposal.type})</div>
              {proposal.base.content && (
                <div className="text-gray-600 mb-2 truncate">
                  New Content: "{proposal.base.content}"
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => acceptProposal(id)}
                  className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 py-1 rounded font-medium transition-colors"
                >
                  Accept
                </button>
                <button 
                  onClick={() => rejectProposal(id)}
                  className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-1 rounded font-medium transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
