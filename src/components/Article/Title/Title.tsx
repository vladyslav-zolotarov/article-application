import React from "react";
import { IArticleComponentProps } from "../../../types/types";

export const Title = ({
  post,
  headingProps,
  skeletonHeadingProps,
  ...props
}: IArticleComponentProps) => {
  const { isLoading, post } = useArticleContext();

  if (!post) return null;

  return (
    <div {...props} className={classList}>
      {isLoading ? (
        <h2
          {...skeletonHeadingProps}
          className={`article__title ${classListSkeleton}`}
        ></h2>
      ) : (
        <h2 {...headingProps} className="article__title">
          {post.title}
        </h2>
      )}
    </div>
  );
};
