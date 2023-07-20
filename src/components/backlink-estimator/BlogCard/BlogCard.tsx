import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard: React.FC<{ blog: IBlog }> = ({ blog }) => {
  return (
    <Link href={blog.link} target="_blank" passHref>
      <div className="group">
        <div className="aspect-video rounded-[14px] overflow-hidden relative">
          <Image
            src={blog.image}
            height={200}
            width={200}
            alt="26 ideas to get your next sales promotion noticed"
            className="duration-200 group-hover:scale-[105%]"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 2,
            }}
          />
        </div>
        <h3
          className="mt-4 md:mt-6 lg:mt-7 font-semiold text-xl md:text-2xl text-[#111111]"
          style={{ lineHeight: "150%" }}
        >
          {blog.title}
        </h3>
        <p className="mt-2 md:mt-5 text-[#6F7071] font-normal">
          {blog.date} · {blog.readTime}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
