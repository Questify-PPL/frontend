import { Redirect } from "@/components/link";
import { getLinkMapping } from "@/lib/action";
import { LinkResponse } from "@/lib/types";

interface LinkProps {
  params: {
    link: string;
  };
}

export default async function Link({ params }: Readonly<LinkProps>) {
  const { link } = params;
  const response: LinkResponse = await fetchFormMappping();

  async function fetchFormMappping() {
    try {
      return await getLinkMapping(link);
    } catch (error) {}

    return {};
  }

  return (
    <div data-testid="redirect">
      <Redirect response={response} />
    </div>
  );
}
