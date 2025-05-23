import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (_, res) => {
  res.render("menu");
});

pageRouter.get("/users/login", (_, res) => {
  res.render("login", { error: null });
});

pageRouter.get("/users/register", (_, res) => {
  res.render("register", { error: null });
});

pageRouter.get("/users/forgot-password", (_, res) => {
  res.render("forgot-password", { error: null, message: null });
});

pageRouter.get("/users/reset-password", (req, res) => {
  const { token } = req.query;
  console.log(token)
  res.render("reset-password", { error: null, message: null, token });
});

// pageRouter.get("/profile",(req,res)=>{
//   res.render("profile",{data:null})
// })

export default pageRouter;
