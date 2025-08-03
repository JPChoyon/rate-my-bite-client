"use client";
import { Bell, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { Theme } from "@/components/utils/Theme";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <div>
      <div
        className=" flex 
                         items-center gap-4"
      >
        {/* Search */}
        <div className="hidden sm:flex relative w-40 lg:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-8 w-8" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
            0
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <Theme />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-2 bg-primary"
            >
              <User className="h-10 w-10 text-white " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href="/profile/subscription">
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
