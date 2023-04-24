import prisma from "../utils/prisma";
import type { News, User } from "@prisma/client";

const getSavedNews = async (userPayload: User) => {
  const { id } = userPayload;

  const savedNews = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      news: {
        select: {
          id: true,
          author: true,
          title: true,
          description: true,
          url: true,
          urlToImage: true,
          publishedAt: true,
          content: true,
          saved: true,
        },
      },
    },
  });

  const news = savedNews?.news ? savedNews.news : savedNews;

  console.log(news);

  return news;
};

const updateSavedNews = async (userPayload: User, newsPayload: News) => {
  const { id } = userPayload;

  const findNew = await prisma.news.findUnique({
    where: {
      id: newsPayload.author + newsPayload.title,
    },
  });

  if (!findNew) {
    const newNews = await prisma.news.create({
      data: {
        id: newsPayload.author + newsPayload.title,
        author: newsPayload.author,
        title: newsPayload.title,
        description: newsPayload.description,
        url: newsPayload.url,
        urlToImage: newsPayload.urlToImage,
        publishedAt: newsPayload.publishedAt,
        content: newsPayload.content,
        saved: true,
        User: {
          connect: {
            id,
          },
        },
      },
    });
  }

  if (newsPayload.saved === false) {
    const deleteNews = await prisma.news.delete({
      where: {
        id: newsPayload.author + newsPayload.title,
      },
    });
  }

  return { message: "News Saved Updated" };
};

const verifySaved = async (userPayload: User, newsPayload: News) => {
  const { id } = userPayload;

  const findNew = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      news: {
        where: {
          id: newsPayload.author + newsPayload.title,
        },
      },
    },
  });

  if (findNew?.news?.length === 0) {
    return false;
  }

  return true;
};

export default {
  getSavedNews,
  updateSavedNews,
  verifySaved,
};
