import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
