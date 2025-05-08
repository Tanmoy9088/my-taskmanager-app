import Image from "next/image";

export default function TeamCard({ name, role, image }) {
  return (
    <div className="bg-white shadow-md p-4 rounded text-center">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="rounded-full mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
