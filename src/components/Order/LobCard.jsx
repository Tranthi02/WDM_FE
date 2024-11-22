import { useState, useRef, useEffect, useMemo } from 'react';
import lobImg from '../../assets/images/lobby.jpg';

const LobCard = (p) => {
  const {
    lobby,
    setNextModalOpen,
    setPickLobbyModalClose,
    setLobbyInfo,
    editLobby,
    shiftList,
  } = p;
  const { id, name, Wedding } = lobby;
  const [showShiftModal, setShowShiftModal] = useState(false);
  const cardRef = useRef(null);

  // Get lobby booked shift
  const bookedShift = useMemo(
    () => Wedding.map(({ shift_id }) => shift_id),
    [Wedding]
  );

  const resolveBusyShift = (shift_id, bookedShift) => {
    if (bookedShift.includes(shift_id)) return 'busy';
  };

  const handleCardClick = () => {
    setShowShiftModal(true);
  };

  const handleShiftClick = (shift) => {
    setLobbyInfo(id, shift, name);
    // If Lobby card in edit mode, close lobby modal after shift picked
    if (editLobby) return setPickLobbyModalClose();
    setNextModalOpen();
  };

  const handleOutsideClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setShowShiftModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <div className="card" ref={cardRef} onClick={handleCardClick}>
      <img src={lobImg} alt={name} className="lob-img" />
      <div className="content">
        <h5>{name}</h5>
        {/* <div className="shift-wrapper">
          { shiftList && shiftList.map((shift) => (
            <span
              className={`shift ${resolveBusyShift(shift.id, bookedShift)}`}
              key={shift.id}
            >
              {shift.name}
            </span>
          ))}
        </div> */}
        {showShiftModal && (
          <div className="choose-shift">
            <h6>choose shift</h6>
            {shiftList &&
              shiftList.map((shift) => (
                <span
                  key={shift.id}
                  className={!bookedShift.includes(shift.id) ? 'shift' : ''}
                  onClick={() => handleShiftClick(shift)}
                >
                  {!bookedShift.includes(shift) && shift.name}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default LobCard;
