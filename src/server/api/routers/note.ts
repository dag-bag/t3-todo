import { createTRPCRouter, protectedProcedure } from "./../trpc";

import { z } from "zod";

export const noteRouter = createTRPCRouter({
  getALL: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
        content: z.string(),
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.topicId,
          content: input.content,
          topicId: input.topicId,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteAllNotes: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.deleteMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
});
