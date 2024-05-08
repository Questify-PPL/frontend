import { processTopUp } from "@/lib/action/topup";
import { ChangeEvent, useState } from "react";
import { LuCoins, LuUploadCloud } from "react-icons/lu";
import { useToast } from "../ui/use-toast";
import TopUpFinalCard from "./TopUpFinalCard";

const PaymentPopup = ({
  onClose,
  amount,
}: {
  onClose: () => void;
  amount: number | undefined;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (amount === undefined || amount < 10000) {
      toast({
        title: "Error",
        description: "Please enter the correct amount",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "Please upload your proof of payment",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();

    formData.append("amount", (amount ?? 0).toString());
    formData.append("payment", "BCA");
    formData.append("exchange", "Top Up");
    formData.append("buktiPembayaran", file);

    try {
      const response = await processTopUp(formData);

      if (response.statusCode === 201) {
        setConfirmationOpen(true);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
        <div className="bg-white w-full p-4 animate-slideup relative flex flex-col items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-700 bg-transparent hover:bg-gray-200 rounded-full p-1 leading-none"
          >
            &times;
          </button>
          <div className="mb-4 text-center">
            <div className="text-sm">You&apos;re going to top up</div>
            <div className="flex justify-center items-center font-bold text-lg">
              <span className="mr-1">+</span>
              <LuCoins
                className="text-[#E2B720]"
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
              <span className="ml-1">
                {(amount ?? 0).toLocaleString()} credits
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-400 p-4 w-full max-w-xs">
            <div className="flex justify-center items-center w-full">
              <LuUploadCloud className="text-4xl text-[#32636A] mb-4" />
            </div>
            <div className="text-l mb-2 text-black font-bold">Upload Here</div>
            <div className="text-sm mb-4">Send us your proof of payment</div>
            <input
              type="file"
              className="text-center w-full text-sm"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
          </div>
          <button
            className="w-full max-w-xs mt-4 bg-[#32636A] text-white font-medium py-2 px-6 rounded-md hover:bg-[#32636A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>

      <TopUpFinalCard isOpen={isConfirmationOpen} onClose={() => onClose()} />
    </>
  );
};

export default PaymentPopup;
