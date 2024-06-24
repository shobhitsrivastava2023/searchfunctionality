import { SearchInput}  from "./components/SearchInput";

import prisma from "@/lib/prisma";

/*async function fetchEmails() {
  const emails = await prisma.user.findMany({
    select: { email: true },
    take: 3,
  });
  return emails;
}
*/
async function fetchEmails(query: string) {
  const emails = await prisma.user.findMany({
    where: {
      email: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: { email: true },
    take: 3,
  });
  return emails;
}

export default async function Home({searchParams} : {
  searchParams? : {
    query? : string,
    page? : string,
   
  },
 
}) {
 
  const query = searchParams?.query || ''; 
  const emails = await fetchEmails(query);
  
  
  return (
    <div className="flex flex-col justify-center items-center h-dvh ml-52 mr-52">
    <SearchInput /> 

    <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {emails.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    


  
    
  );
}
