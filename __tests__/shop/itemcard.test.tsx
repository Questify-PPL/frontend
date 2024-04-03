import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "@/components/shop/ItemCard";
import "@testing-library/jest-dom";

describe("ItemCard", () => {
  test("toggles selected state on card click", () => {
    const props = {
      label: "Item Label",
      cost: "$10",
      discCost: "$8",
      imageUrl: "example.com/image.jpg",
    };

    render(<ItemCard {...props} />);

    // Query the card element based on its data-testid
    const cardElement = screen.getByTestId("item-card");

    // Assert that the selected state is initially false
    expect(cardElement).toHaveClass("cursor-pointer");
    expect(cardElement).not.toHaveClass("bg-[#324B4F] bg-opacity-60");

    // Simulate click on the card
    fireEvent.click(cardElement);

    // Assert that the selected state is toggled to true
    expect(cardElement).toHaveClass("bg-[#324B4F] bg-opacity-60");

    // Simulate another click on the card
    fireEvent.click(cardElement);

    // Assert that the selected state is toggled back to false
    expect(cardElement).not.toHaveClass("bg-[#324B4F] bg-opacity-60");
  });
});
