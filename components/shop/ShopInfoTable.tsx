'use client'

import { Card } from "@/components/ui/card";

const ShopInfoTable: React.FC = ({ }) => {

    return (
      <Card className="min-w-80 max-w-2xl max-h-9 p-3 gap-2 mt-2 justify-between">
       
  
          <div className="flex flex-row justify-between rounded-lg">
            <div className="flex justify-between w-1/2"> 
            <span className="font-medium font-bold text-[#32636A] text-xs" >Item</span>
            </div>
            
            <div className="flex justify-between w-1/2"> 
            <span className="font-medium font-bold text-[#32636A] text-xs" >Date</span>
            </div>
        
          </div>
        
      </Card>
    );
  };
  
  export default ShopInfoTable;