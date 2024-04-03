import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "@/components/shop/ItemCard";
import "@testing-library/jest-dom";

describe("ItemCard", () => {
  test("toggles selected state on card click", () => {
    const shopItem = {
      id: 7,
      title: "10 Forms",
      price: 200000,
      category: "BASIC_PLAN",
      advertisedOriginalPrice: 270000,
      description: "Get 10 Forms",
    };

    // Mock functionality of setChosenShopItem in the context
    const setChosenShopItem = jest.fn();
    jest.mock("@/lib/context", () => {
      return {
        useShopContext: jest
          .fn()
          .mockReturnValue({ chosenShopItem: undefined, setChosenShopItem }),
      };
    });

    render(<ItemCard shopItem={shopItem} imageUrl="https://image.com/test" />);

    // Query the card element based on its data-testid
    const cardElement = screen.getByTestId("item-card");

    // Assert that the selected state is initially false
    expect(cardElement).toHaveClass("cursor-pointer");
    expect(cardElement).not.toHaveClass("bg-[#324B4F] bg-opacity-60");

    // Assert that the selected state is toggled to true
    expect(cardElement).toHaveClass(
      "rounded-lg border bg-card text-card-foreground shadow-sm relative min-w-32 h-fit p-3 gap-2 cursor-pointer",
    );
  });
});
