import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import RequiredToggle from "./RequiredToggle";

type QuestionType = "mcq" | "checkbox" | "short" | "long";

interface Props {
  index: number;
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  answerKey: number[];
  points: number;

  onChange: (data: Partial<Props>) => void;
  onAddOption: () => void;
  onDelete: () => void;
}

const QuestionCard = ({
  index,
  question,
  type,
  options,
  required,
  answerKey,
  points,
  onChange,
  onAddOption,
  onDelete,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const typeOptions: { label: string; value: QuestionType }[] = [
    { label: "Multiple choice", value: "mcq" },
    { label: "Checkboxes", value: "checkbox" },
    { label: "Short answer", value: "short" },
    { label: "Long answer", value: "long" },
  ];

  const selectedLabel =
    typeOptions.find((o) => o.value === type)?.label || "Select type";

  return (
    <div className="border border-[#E5E5E5] bg-white rounded-xl mx-8 p-4 mb-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          value={question}
          placeholder={`${index}. Question`}
          onChange={(e) => onChange({ question: e.target.value })}
          className="font-medium text-[16px] w-full outline-none"
        />

        {/*  DROPDOWN */}
        <div className="relative min-w-[160px]">
          <div
            onClick={() => setOpen(!open)}
            className="px-4 py-2 border border-[#E5E5E5] rounded-lg bg-white
                       text-sm cursor-pointer flex justify-between items-center"
          >
            <span>{selectedLabel}</span>
            <ChevronDown size={16} className="text-[#666]" />
          </div>

          {open && (
            <div
              className="absolute top-full mt-1 w-full bg-white
                            border border-[#E5E5E5] rounded-xl shadow z-50"
            >
              {typeOptions.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    onChange({ type: item.value });
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#F5F7FF]
                    ${
                      type === item.value
                        ? "bg-[#F5F7FF] text-[#F67300]"
                        : "text-[#333]"
                    }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= OPTIONS ================= */}
      {(type === "mcq" || type === "checkbox") &&
        options.map((opt, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input type={type === "mcq" ? "radio" : "checkbox"} disabled />
            <input
              value={opt}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => {
                const updated = [...options];
                updated[i] = e.target.value;
                onChange({ options: updated });
              }}
              className="outline-none w-full bg-transparent"
            />
          </div>
        ))}

      {(type === "short" || type === "long") && (
        <input
          disabled
          placeholder={
            type === "short" ? "Answer max 50 words" : "Answer max 250 words"
          }
          className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 text-sm"
        />
      )}

      {(type === "mcq" || type === "checkbox") && (
        <button onClick={onAddOption} className="text-[#F67300] text-sm mt-2">
          + Add option
        </button>
      )}

      <div className="flex justify-between items-center mt-4">
        {/* Answer Key Button */}
        <button
          onClick={() => setShowAnswerKey(true)}
          className="text-[#F67300] text-sm"
        >
          Answer Key
          {points > 0 && (
            <span className="text-[#666]"> ({points} points)</span>
          )}
        </button>

        <div className="flex items-center gap-3">
          {/* DELETE */}
          <button
            onClick={onDelete}
            className="text-[#9E9E9E] hover:text-red-500 transition"
            title="Delete question"
          >
            <Trash2 size={18} />
          </button>

          {/* REQUIRED */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#666]">Required</span>
            <RequiredToggle
              checked={required}
              onChange={() => onChange({ required: !required })}
            />
          </div>
        </div>
      </div>

      {/* ================= ANSWER KEY ================= */}
      {showAnswerKey && (
        <div className="mt-4 border border-[#E5E5E5] rounded-xl p-4 bg-white">
          {(type === "short" || type === "long") && (
            <>
              {/* HEADER ROW */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium">Enter the key words</p>

                {/* POINTS  */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={points}
                    onChange={(e) =>
                      onChange({ points: Number(e.target.value) })
                    }
                    className="w-16 border border-[#E5E5E5] rounded px-2 py-1 text-sm"
                  />
                  <span className="text-sm text-[#666]">Points</span>
                </div>
              </div>

              {/* TEXTAREA */}
              <textarea
                placeholder="Enter keywords or sample answer"
                value={options[0] || ""}
                onChange={(e) => onChange({ options: [e.target.value] })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 text-sm mb-3"
              />

              {/* DONE BUTTON */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAnswerKey(false)}
                  className="bg-[#7B61FF] text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Done
                </button>
              </div>
            </>
          )}

          {/* -------- MCQ / CHECKBOX -------- */}
          {(type === "mcq" || type === "checkbox") && (
            <>
              {/* HEADER ROW */}
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium">Choose correct answers:</p>

                {/* POINTS */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={points}
                    onChange={(e) =>
                      onChange({ points: Number(e.target.value) })
                    }
                    className="w-16 border border-[#E5E5E5] rounded px-2 py-1 text-sm"
                  />
                  <span className="text-sm text-[#666]">Points</span>
                </div>
              </div>

              {/* OPTIONS */}
              {options.map((opt, i) => {
                const checked = answerKey.includes(i);

                return (
                  <label
                    key={i}
                    className={`flex items-center gap-3 mb-1 p-2 rounded-lg cursor-pointer
            ${checked ? "bg-[#EAF7EE]" : ""}`}
                  >
                    <input
                      type={type === "mcq" ? "radio" : "checkbox"}
                      checked={checked}
                      onChange={() => {
                        let updated: number[] = [];

                        if (type === "mcq") {
                          updated = [i];
                        } else {
                          updated = checked
                            ? answerKey.filter((a) => a !== i)
                            : [...answerKey, i];
                        }

                        onChange({ answerKey: updated });
                      }}
                    />

                    <span className="flex-1">{opt || `Option ${i + 1}`}</span>

                    {checked && (
                      <span className="text-green-600 font-sm">✓</span>
                    )}
                  </label>
                );
              })}

              {/* DONE BUTTON */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAnswerKey(false)}
                  className="bg-[#F67300] text-white px-4 py-1 rounded-full text-sm"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
