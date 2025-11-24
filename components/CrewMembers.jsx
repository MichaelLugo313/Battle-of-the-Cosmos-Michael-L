import { Users } from 'lucide-react';

export function CrewMembers({ members, currentPageDialogue = {} }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="crew-members">
      <div className="crew-header">
        <Users className="icon" />
        <span>Crew Members</span>
      </div>
      
      {members.length === 0 ? (
        <p className="crew-empty">Flying solo</p>
      ) : (
        <div>
          {members.map((member) => (
            <div
              key={member.id}
              className="crew-member-wrapper"
            >
              <div className="crew-member">
                <div className="crew-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : (
                    getInitials(member.name)
                  )}
                </div>
                <div className="crew-info">
                  <p className="crew-name">{member.name}</p>
                  <p className="crew-role">{member.role}</p>
                </div>
              </div>
              
              {/* Show page-specific dialogue if available, otherwise show default */}
              {(currentPageDialogue[member.id] || member.dialogue) && (
                <div className="crew-dialogue-wrapper">
                  <div className="crew-dialogue">
                    <div className="crew-dialogue-arrow" />
                    <p>"{currentPageDialogue[member.id] || member.dialogue}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}