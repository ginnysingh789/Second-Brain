import { ShareIcon } from "../Icons/ShareIcon"
interface CardType {
    title: string,
    link: string,
    type: "twitter" | "Youtube"
}
export const Card = (prop: CardType) => {
    return (
        <div>
            <div className="p-8 bg-white rounded-md max-w-72 shadow-md border  border-slate-100">
                <div className="flex justify-between">
                    <div className="flex font-medium">
                        <div className="flex items-center pr-2">
                            <ShareIcon size="md" />
                        </div>
                        {prop.title}
                    </div>
                    <div className="flex">
                        <div className="pr-2 text-gray-700"> <ShareIcon size="md" />
                            <a href={prop.link} target="_black"> </a>
                        </div>
                        <div className=" text-gray-700"> <ShareIcon size="md" />
                        </div>
                    </div>
                </div>
                {/* Embed Youtube video */}
                <div className="w-full aspect-video mt-4">
                    {prop.type === "Youtube" &&
                        <iframe
                        className="w-full h-full rounded-md"
                        src={prop.link.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    }
                    {prop.type === "twitter" && <blockquote className="twitter-tweet ">
                        <a href={prop.link.replace('x.com','twitter.com')}></a>
                    </blockquote>}
                </div>
            </div>
        </div>
    )
}