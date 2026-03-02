interface Props {
  checked: boolean;
  onChange: () => void;
}

const RequiredToggle = ({ checked, onChange }: Props) => {
  return (
    <button
      onClick={onChange}
      className={`w-[42px] h-[22px] rounded-full relative transition
        ${checked ? "bg-[#F67300]" : "bg-[#D3D3D3]"}`}
    >
      <span
        className={`absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full transition
   ${checked ? "right-[3px]" : "left-[3px]"}`}
      />
    </button>
  );
};

export default RequiredToggle;
