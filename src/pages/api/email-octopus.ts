import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Only post request is allowed" });
  try {
    let response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${process.env.NEXT_PUBLIC_OCTOPUS_EMAIL_LIST_ID}/contacts`,
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
