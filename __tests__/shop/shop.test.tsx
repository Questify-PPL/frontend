import React from 'react';
import { render, screen, } from '@testing-library/react';
import "@testing-library/jest-dom"; // Import this to extend Jest's expect capabilities
import Shop from '@/app/(protected)/shop/page'; // Assuming Shop component is in the correct path


describe('Shop component', () => {
    describe('Shop component', () => {
        beforeEach(() => {
          render(<Shop />);
        });

        it('renders basic plans section correctly', () => {
            const basicPlansText = screen.getByText('Basic Plans');
            const formExpiryText = screen.getByText('The form has no expiry date');
            
        
            expect(basicPlansText).toBeInTheDocument();
            expect(formExpiryText).toBeInTheDocument();
          });
        
          it('renders purchase history section correctly', () => {
            const purchaseHistoryText = screen.getByText('Purchase History');
            const formsBoughtText = screen.getByText('Forms you have bought');
            
            expect(purchaseHistoryText).toBeInTheDocument();
            expect(formsBoughtText).toBeInTheDocument();
          });
          it('renders ItemCard components', () => {
            const cardElements = screen.getAllByTestId('item-card');
            expect(cardElements.length).toBe(4); // Assuming there are 4 ItemCard components rendered in Shop
          });
        
          it('renders InfoTable component', () => {
            const infoTableElement = screen.getByText(/Purchase History/i);
            expect(infoTableElement).toBeInTheDocument();
          });
        
          it('renders PurchaseCard component', () => {
            const purchaseCardElement = screen.getByText(/Credit Balance/i);
            expect(purchaseCardElement).toBeInTheDocument();
          });
        });
})