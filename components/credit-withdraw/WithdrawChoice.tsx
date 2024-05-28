"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuCheck, LuCoins } from "react-icons/lu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { getUserCredit } from "@/lib/action/user";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWithdrawal } from "@/lib/schema/create-withdrawal.schema";
import { createWithdrawal as createWithdrawalAction } from "@/lib/action/withdraw";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WithdrawNominal = {
  id: number;
  nominal: number;
  price: number;
  discount: number;
};

const withdrawNominals: Readonly<WithdrawNominal[]> = [
  { id: 1, nominal: 10000, price: 13000, discount: 16000 },
  { id: 2, nominal: 20000, price: 24000, discount: 30000 },
  { id: 3, nominal: 50000, price: 55000, discount: 75000 },
  { id: 4, nominal: 100000, price: 106000, discount: 150000 },
];

export function WithdrawChoice() {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [userCredit, setUserCredit] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const fetchUserCredit = async () => {
      const credit = await getUserCredit();
      setUserCredit(credit);
    };
    fetchUserCredit();
  }, []);

  const selectIndicator = (id: number) => {
    if (selectedItemId === id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(id);
      setAmount(withdrawNominals.find((item) => item.id === id)?.nominal || 0);
    }
  };

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWithdrawal>({
    resolver: zodResolver(CreateWithdrawal),
    defaultValues: {
      payment: "",
      accountNumber: "",
    },
  });

  const toForm: SubmitHandler<CreateWithdrawal> = async (data) => {
    try {
      await createWithdrawalAction([amount, data.payment, data.accountNumber]);
      router.push(`/withdraw`);
    } catch (error) {
      toast({
        title: "Failed to create withdrawal",
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="flex flex-row gap-2 overflow-x-scroll">
      {withdrawNominals.map((item) => (
        <div key={item.id} className="relative">
          <Drawer>
            <DrawerTrigger
              className="absolute top-0 left-0 w-full h-full hover:bg-primary/20 z-10 rounded-md"
              onClick={() => selectIndicator(item.id)}
            >
              <div
                className={`${
                  selectedItemId === item.id ? "flex" : "hidden"
                } justify-center items-center w-full h-full flex-col bg-primary/70 rounded-md`}
              >
                <div className="flex w-5 h-5 relative bg-[#DDFAD6] rounded-full items-center justify-center">
                  <LuCheck className="w-3 h-3 text-[#39A014]"></LuCheck>
                </div>
                <span className="text-white text-[10px] font-bold">
                  Selected
                </span>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <form onSubmit={handleSubmit(toForm)}>
                <DrawerHeader>
                  <div className="flex flex-col w-full items-start">
                    {userCredit < item.nominal ? (
                      <span className="text-[#E24F20] text-[10px] leading-3 font-normal">
                        Insufficient Credit Balance
                      </span>
                    ) : (
                      <span className="text-[#95B0B4] text-[10px] leading-3 font-normal">
                        Credit Balance
                      </span>
                    )}
                    <div className="flex flex-row gap-1 items-center justify-center">
                      <LuCoins className="flex w-3 h-3 text-[#E2B720]"></LuCoins>
                      <span className="text-sm font-bold">{userCredit}</span>
                    </div>
                  </div>
                  <Separator className="bg-[#E5EEF0]"></Separator>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col w-full items-start">
                      <span className="text-[#95B0B4] text-sm">Total</span>
                      <div className="flex flex-row gap-0.5 items-center justify-center">
                        <span className="text-[10px] text-primary">
                          You have got extra
                        </span>
                        <span className="text-[10px] text-primary font-semibold">
                          Rp{item.discount - item.price}
                        </span>
                        <span className="text-[10px] text-primary">!</span>
                      </div>
                    </div>
                    <div className="flex flex-col w-full items-end">
                      <span className="text-sm font-semibold">
                        Rp{item.nominal}
                      </span>
                      <div className="flex flex-row gap-0.5 items-center justify-center">
                        <span className="text-[10px] leading-3">for</span>
                        <LuCoins className="flex w-3 h-3 text-[#E2B720]"></LuCoins>
                        <span className="text-[10px] leading-3">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="payment">Payment Using</Label>
                      <Input
                        type="text"
                        id="payment"
                        {...register("payment")}
                        placeholder="Set"
                        className="rounded-[6px] border-[1px] border-solid"
                      />
                      {errors.payment && (
                        <div className="text-red-500 font-normal text-xs mt-0.5">
                          {errors.payment.message}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="accountNumber">Your Account Number</Label>
                      <Input
                        type="text"
                        id="accountNumber"
                        {...register("accountNumber")}
                        placeholder="Set"
                        className="rounded-[6px] border-[1px] border-solid"
                      />
                      {errors.accountNumber && (
                        <div className="text-red-500 font-normal text-xs mt-0.5">
                          {errors.accountNumber.message}
                        </div>
                      )}
                    </div>
                  </div>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button disabled={item.nominal > userCredit} type="submit">
                      Purchase
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
          <Card className="flex flex-col p-3 gap-2">
            <div className="w-[86px] h-[86px]">
              <Image
                src={`/assets/${item.nominal}.svg`}
                alt={item.nominal.toString()}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <span className="w-full text-sm font-bold text-right">
                Rp{item.nominal}
              </span>
              <Separator className="bg-[#E5EEF0]"></Separator>
              <div className="flex flex-row gap-0.5">
                <span className="flex w-3 h-3 justify-center bg-[#FCF8E9] items-center rounded-full">
                  <LuCoins className="flex w-1.5 h-1.5 text-[#E2B720]"></LuCoins>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-3">{item.price}</span>
                  <span className="line-through text-[8px] leading-3 text-[#E24F20]">
                    {item.discount}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
