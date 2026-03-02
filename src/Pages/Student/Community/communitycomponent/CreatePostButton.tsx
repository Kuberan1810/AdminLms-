import { Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

const CreatePostButton = ({ onCreate }: Props) => {
  return (
    <button
      onClick={onCreate}
      className=" flex items-center justify-center gap-2 bg-orange-500 text-white  px-4 py-2.5 rounded-md text-sm hover:bg-orange-600 transition w-full cursor-pointer
      "
    >
      <Plus size={18} />
      <span className="whitespace-nowrap">Create Post</span>
    </button>
  );
};

export default CreatePostButton;