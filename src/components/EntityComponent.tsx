import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

// This type describes the props for an Entity Header component
type EntityHeaderProps = {
  title: string;

  description?: string;

  newButtonLabel: string;

  disabled?: boolean;

  isCreating?: boolean;
} &
  // ✅ CASE 1: Component receives an onNew callback function
  // In this case, newButtonHref MUST NOT exist
  (| {
        onNew: () => void; // Function triggered when clicking on "New"
        newButtonHref?: never; // Forbidden when onNew is provided
      }

    // ✅ CASE 2: Component receives a link instead of a callback
    // In this case, onNew MUST NOT exist
    | {
        newButtonHref: string; // Link for navigation
        onNew?: never; // Forbidden when newButtonHref is provided
      }

    // ✅ CASE 3: No new button functionality
    // Neither onNew nor newButtonHref is provided
    | {
        onNew?: never; // No callback
        newButtonHref?: never; // No link
      }
  );

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button disabled={isCreating || disabled} size={"sm"} onClick={onNew}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size={"sm"} asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
