import { useEffect, useRef } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./UI/Button";

interface ModelType {
  open: boolean;
  onClose: () => void;
}

export const ContentModel = (props: ModelType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))//Ref will point to model Div
         {
        props.onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.onClose]);

  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen bg-red-200 top-0 left-0 fixed opacity-70 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded p-4 shadow-lg w-full max-w-md relative z-50"
          >
            <div className="flex justify-end">
              <div onClick={props.onClose} className="cursor-pointer">
                <CrossIcon size="md" />
              </div>
            </div>
            <div>
              <Input placeholder={"Title"} />
              <Input placeholder={"Type"} />
              <div className="flex justify-center mt-4">
                <Button variant="primary" text="Submit" size="md" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Input({
  onChange,
  placeholder,
}: {
  onChange?: () => void;
  placeholder: string;
}) {
  return (
    <div className="mt-4">
      <input
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className="px-4 py-2 border rounded w-full"
      />
    </div>
  );
}
