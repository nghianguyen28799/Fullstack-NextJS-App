import React, { ButtonHTMLAttributes, FC } from "react";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}
const CopyButton: FC<CopyButtonProps> = ({ valueToCopy, ...rest }) => {
  return (
    <Button
      {...rest}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: "Copied!",
          message: "API key copied to clipboard",
          type: "success",
        });
      }}
      variant="ghost"
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
};

export default CopyButton;
