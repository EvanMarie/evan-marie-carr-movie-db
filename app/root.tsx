import { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "tailwind.css";
import FlexFull from "./buildingBlockComponents/flexFull";

// import { AnimatePresence } from "framer-motion";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Londrina+Shadow&display=swap",
  },
];

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{
          margin: 0,
          position: "fixed",
          top: 0,
          left: 0,
          overflowX: "hidden",
          overflowY: "hidden",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
          color: "black",
          fontFamily: "monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "2vh",
          boxShadow: "1vh 1vh 1vh black",
          textShadow: "0.3vh 0.3vh 0.5vh white",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
            width: "100%",
            height: "100%",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "2vh",
            boxShadow: "0 0 1vh black",
            textShadow: "0 0 0.5vh white",
            margin: 0,
            position: "fixed",
            top: 0,
            left: 0,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "fit-content",
              background:
                "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
              padding: "1.5vh",
              boxShadow: "0 0 1vh black",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "2vh",
              fontWeight: "600",
              flexDirection: "column",
              gap: "1vh",
            }}
          >
            <div style={{ fontSize: "3vh" }}>Oh, snippity snaps!</div>
            <div>
              {error.status} - {error.statusText}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3vh",
          }}
        >
          <div
            style={{
              width: "fit-content",

              height: "fit-content",
              background: "#4287f5",
              padding: "1vh 2vh",
              boxShadow: "1vh 1vh 1vh black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "1vh",
              border: "0.3vh solid cyan",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontSize: "2vh",
                fontWeight: "600",
                color: "black",
                textShadow: "0.2vh 0.2vh 0.5vh white",
              }}
            >
              {error.data}
            </p>
          </div>
          <div
            style={{
              zIndex: 1,
            }}
          >
            <img
              src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/movie-reel-yellow.webp"
              alt="Take Me to the Movies"
              style={{
                height: "8vh",
                width: "auto",
                borderRadius: "100%",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "2vh", fontWeight: 600, color: "black" }}>
              Try refreshing your browser first, and if that does not work:
            </p>
          </div>
          <a
            href="https://darkviolet.ai"
            style={{
              width: "fit-content",
              height: "fit-content",
              background:
                "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
              padding: "1vh 2vh",
              boxShadow: "1vh 1vh 1vh black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "1vh",
              border: "0.3vh solid black",
              zIndex: 1,
              color: "black",
              textDecoration: "none",
            }}
          >
            Let's try this again...click me
          </a>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div
        style={{
          margin: 0,
          position: "fixed",
          top: 0,
          left: 0,
          overflowX: "hidden",
          overflowY: "hidden",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
          color: "black",
          fontFamily: "monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "2vh",
          boxShadow: "1vh 1vh 1vh black",
          textShadow: "0.3vh 0.3vh 0.5vh white",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
            width: "100%",
            height: "100%",
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
            alignItems: "center",
            fontSize: "2vh",
            boxShadow: "0 0 1vh black",
            textShadow: "0 0 0.5vh white",
            margin: 0,
            position: "fixed",
            top: 0,
            left: 0,
            overflowX: "hidden",
            overflowY: "hidden",
            alignContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "fit-content",
              background:
                "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
              padding: "1.5vh",
              boxShadow: "0 0 1vh black",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "4vh",
              fontWeight: "600",
              flexDirection: "column",
              gap: "1vh",
            }}
          >
            <div style={{ fontSize: "3vh" }}>Oh, snippity snaps!</div>
          </div>
          <h2>{error.message}</h2>
          <p>The stack trace is:</p>
          <div
            style={{
              maxWidth: "90vw",
              overflow: "auto",
              maxHeight: "25svh",
              padding: "1vh",
              background: "rgba(0,255,255,0.5)",
              borderRadius: "1vh",
              boxShadow: "inset 0 0 10px #000",
            }}
          >
            <pre style={{ fontSize: "1.6vh" }}>{error.stack}</pre>
          </div>
          <div
            style={{
              zIndex: 1,
            }}
          >
            <img
              src="https://mhejreuxaxxodkdlfcoq.supabase.co/storage/v1/render/image/public/darkVioletPublic/movie-reel-yellow.webp"
              alt="Take Me to the Movies"
              style={{
                height: "8vh",
                width: "auto",
                borderRadius: "100%",
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "2vh", fontWeight: 600, color: "black" }}>
              Try refreshing your browser first, and if that does not work:
            </p>
          </div>
          <a
            href="https://darkviolet.ai"
            style={{
              width: "fit-content",
              height: "fit-content",
              background:
                "linear-gradient(357deg, rgba(250, 238, 167,1) 0%, rgba(192, 230, 252,1) 100%)",
              padding: "1vh 2vh",
              boxShadow: "1vh 1vh 1vh black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "1vh",
              border: "0.3vh solid black",
              zIndex: 1,
              color: "black",
              textDecoration: "none",
            }}
          >
            Let's try this again...click me
          </a>
        </div>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <FlexFull className="h-[100svh] max-h-[100svh] overflow-hidden rounded-none">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </FlexFull>
      </body>
    </html>
  );
}
