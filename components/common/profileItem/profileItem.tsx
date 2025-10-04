import React from "react";

interface ProfileItemProps {
  name: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
  textColor?: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({
  name,
  id,
  isSelected,
  onClick,
  textColor = "white",
}) => {
  return (
    <div
      key={id}
      onClick={onClick}
      style={{ color: textColor }}
      className={`flex items-center gap-2 cursor-pointer p-4 rounded-lg transition-all duration-300 ease-in-out font-ibm-plex-mono text-text-sm-medium text-white ${
        isSelected ? "bg-hoverDark " : "hover:bg-hoverDark"
      }`}
    >
      <h4>{name}</h4>
    </div>
  );
};

export default ProfileItem;
