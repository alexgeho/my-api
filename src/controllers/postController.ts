import type { Request, Response } from "express";
import { Post } from "../models/Post.js";


export const posts: Post [] = [
new Post('Story of my life', 'Alex Bitw', 'content comming soon'),
new Post('Here bi title 2', 'author otw', 'content bit delay'),
new Post('3titleTest', '3authorTest', 'Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw Bitaw'),
];

/* fetchAllPosts */

export const fetchAllPosts = (req: Request, res: Response) => {

  
  const search = req.query.search;
  const sort = req.query.sort;
  let filtredPosts = posts;

  try {
    if (search) {
      filtredPosts = filtredPosts.filter((t) =>
        t.content.includes(search.toString()),
      );
    }

    if (sort && sort === "asc")
      filtredPosts = filtredPosts.sort((a, b) => {
        const todo1 = a.content.toLocaleLowerCase();
        const todo2 = b.content.toLocaleLowerCase();

        if (todo1 < todo2) return 1;
        if (todo1 > todo2) return -1;
        return 0;
      });

    res.json(filtredPosts);
  } catch (error) {
    if (error instanceof Error) {
    res.status(500).json({
      error: error.message
    });
    }
  }
}




export const fetchPost = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const post = posts.find((p) => p.id === parseInt(id));

  res.json( post );
};