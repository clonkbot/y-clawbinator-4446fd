import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserApplication = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const applications = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return applications[0] || null;
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const allApplications = await ctx.db.query("applications").collect();
    const pending = allApplications.filter(a => a.status === "pending").length;
    const reviewing = allApplications.filter(a => a.status === "reviewing").length;
    const accepted = allApplications.filter(a => a.status === "accepted").length;
    return {
      total: allApplications.length,
      pending,
      reviewing,
      accepted,
    };
  },
});

export const submit = mutation({
  args: {
    companyName: v.string(),
    tagline: v.string(),
    description: v.string(),
    agentType: v.string(),
    founderName: v.string(),
    founderEmail: v.string(),
    website: v.optional(v.string()),
    stage: v.string(),
    funding: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user already has an application
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      throw new Error("You already have an application submitted");
    }

    return await ctx.db.insert("applications", {
      userId,
      companyName: args.companyName,
      tagline: args.tagline,
      description: args.description,
      agentType: args.agentType,
      founderName: args.founderName,
      founderEmail: args.founderEmail,
      website: args.website,
      stage: args.stage,
      funding: args.funding,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const updateApplication = mutation({
  args: {
    id: v.id("applications"),
    companyName: v.string(),
    tagline: v.string(),
    description: v.string(),
    agentType: v.string(),
    founderName: v.string(),
    founderEmail: v.string(),
    website: v.optional(v.string()),
    stage: v.string(),
    funding: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const application = await ctx.db.get(args.id);
    if (!application || application.userId !== userId) {
      throw new Error("Application not found");
    }

    if (application.status !== "pending") {
      throw new Error("Cannot edit application that is being reviewed");
    }

    await ctx.db.patch(args.id, {
      companyName: args.companyName,
      tagline: args.tagline,
      description: args.description,
      agentType: args.agentType,
      founderName: args.founderName,
      founderEmail: args.founderEmail,
      website: args.website,
      stage: args.stage,
      funding: args.funding,
    });
  },
});
