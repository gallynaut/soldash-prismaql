import { GeckoSocial } from "@prisma/client";
import { Context } from "../context";
import { selectTokensWithGeckoId } from "../token/store";
import { AddGeckoSocialInput } from "./type";

export async function createGeckoSocialRecord(
  ctx: Context,
  newGeckoSocialData: AddGeckoSocialInput | any
) {
  try {
    const newRecord: GeckoSocial = await ctx.prisma.geckoSocial.create({
      data: newGeckoSocialData,
    });
    console.log("Added gecko social for ", newRecord.gecko_id);
    return newRecord.id;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function getGeckoIds(ctx: Context, limit: number = 100) {
  const valid_gecko_ids = await ctx.prisma.token.findMany({
    take: limit,
    where: {
      NOT: {
        gecko_id: null,
      },
    },
    select: {
      gecko_id: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return valid_gecko_ids.map((id) => id.gecko_id);
}

export async function selectLatestGeckoSocial(ctx: Context, gecko_id: string) {
  return await ctx.prisma.geckoSocial.findFirst({
    where: {
      gecko_id: gecko_id,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
}

export async function selectGeckoIdsByGeckoRank(
  ctx: Context
): Promise<string[]> {
  const tokens: string[] = await selectTokensWithGeckoId(ctx);
  const geckoSocials: GeckoSocial[] = new Array<GeckoSocial>();
  for await (const t of tokens) {
    const newSocial = await selectLatestGeckoSocial(ctx, t);
    if (newSocial !== null) {
      geckoSocials.push(newSocial);
    }
  }
  geckoSocials.sort(geckoRankSorter());
  return geckoSocials.map((t) => t.gecko_id);
}

function geckoRankSorter() {
  return function (a: GeckoSocial, b: GeckoSocial) {
    // nulls sort after anything else
    if (a === null || a.gecko_rank === null) {
      return 1;
    } else if (b === null || b.gecko_rank === null) {
      return -1;
    }
    // equal items sort equally
    else if (a.gecko_rank === b.gecko_rank) {
      return 0;
    } else {
      return a.gecko_rank < b.gecko_rank ? -1 : 1;
    }
  };
}
