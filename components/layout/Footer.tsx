import { APP_NAME } from "@/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-10">
      <p className="text-gray-600">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
