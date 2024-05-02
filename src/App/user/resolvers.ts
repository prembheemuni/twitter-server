import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwtService";
const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOAuthUrl.searchParams.set("id_token", googleToken);

    const { data } = await axios.get(googleOAuthUrl.toString(), {
      responseType: "json",
    });

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImgUrl: data.picture,
        },
      });
    }

    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!userInDb) throw new Error("User not found");

    const userToken = JWTService.generateTokenForUser(userInDb);
    return userToken;
  },
};

export const resolvers = { queries };
