import { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from "@module-federation/nextjs-mf/utils";

interface DocumentProps {
  chunks: string[];
}

const MyDocument = ({ chunks }: DocumentProps) => {
  return (
    <Html>
      <Head>
        <FlushedChunks chunks={chunks} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  if (ctx.pathname && !ctx.pathname.endsWith("_error")) {
    await revalidate().then((shouldUpdate) => {
      if (shouldUpdate) {
        console.log("should HMR", shouldUpdate);
      }
    });
  }

  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const chunks = await flushChunks();

  return {
    ...initialProps,
    chunks,
  };
};

export default MyDocument;
