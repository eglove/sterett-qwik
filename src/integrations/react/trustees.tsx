/** @jsxImportSource react **/
import { qwikify$ } from "@builder.io/qwik-react";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import type { JSX } from "react";

import { containerClass } from "../../components/container";
import type { getTrustees } from "../../sanity/queries/get-trustees";
import { imageBuilder } from "../../sanity/sterett-sanity-client";

export type AvatarColor =
  | "danger"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

type TrusteesProperties = {
  readonly colorValues: AvatarColor[];
  readonly trustees: Awaited<ReturnType<typeof getTrustees>>;
};

export function RTrustees({
  trustees,
  colorValues,
}: TrusteesProperties): JSX.Element {
  return (
    <div className={containerClass}>
      <div className="grid gap-4 md:grid-cols-3">
        {trustees.map((trustee, index) => {
          const IMAGE_SIZE = 128;
          const imageUrl = imageBuilder
            .image(trustee.image.asset.url)
            .height(IMAGE_SIZE)
            .width(IMAGE_SIZE)
            .format("webp")
            .url();

          return (
            <div
              key={trustee._id}
              className="mb-4 w-full gap-4 border-b-2 pb-4"
            >
              <User
                avatarProps={{
                  className: "w-32 h-32",
                  color: colorValues[index] ?? "default",
                  isBordered: true,
                  size: "lg",
                  src: imageUrl,
                }}
                className="gap-4"
                description={
                  <>
                    <p>
                      <Link
                        className="text-black underline"
                        href={`tel:${trustee.phoneNumber}`}
                      >
                        {trustee.phoneNumber}
                      </Link>
                    </p>
                    <p className="text-small text-foreground-800">
                      {trustee.duties}
                    </p>
                  </>
                }
                name={trustee.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Trustees = qwikify$(RTrustees, { eagerness: "load" });
