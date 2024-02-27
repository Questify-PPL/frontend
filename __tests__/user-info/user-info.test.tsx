import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Form from "@/components/user-info/Form";

import Image from "next/image";

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        <Image src={src} alt={alt} />
    ),
}));
jest.mock("react-icons/lu", () => ({
    LuCheck: () => <span>LuCheck</span>,
    LuChevronRight: () => <span>LuChevronRight</span>,
    LuChevronDown: () => <span>LuChevronDown</span>,
    LuCheckCheck: () => <span>LuCheckCheck</span>,
}));

describe("Form component", () => {
  it("renders Form component correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Form />);
    
    expect(getByText("User Additional Information")).toBeInTheDocument();
    expect(getByText("Question 1")).toBeInTheDocument();
    expect(getByPlaceholderText("Your answer here")).toBeInTheDocument();
  });

it("handles input changes", () => {
    const { getByPlaceholderText } = render(<Form />);
    const inputElement = getByPlaceholderText("Your answer here") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(inputElement.value).toBe("John Doe");
});

  it("handles button clicks", async () => {
    const { getByText } = render(<Form />);

    fireEvent.click(getByText("Next"));

    await waitFor(() => {
    });

  });

  it("handles form submission", async () => {
    const { getByText, getByPlaceholderText } = render(<Form />);

    fireEvent.change(getByPlaceholderText("Your answer here"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
    });
  });
});
