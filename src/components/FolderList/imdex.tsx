'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

const FolderList = () => {
  const supabase = createClient();

  const { data: folderList } = useQuery({
    queryKey: [queryKeys.FOLDER_LIST],
    queryFn: async () => await supabase.from('folders').select(),
    select: data => data.data,
  });

  if (!Array.isArray(folderList) || !folderList?.length) return <></>;

  return (
    <ul className="space-y-2">
      {folderList.map(folder => (
        <li
          key={folder.id}
          className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-2 sm:flex-row sm:items-center cursor-pointer bg-white"
        >
          <span className="text-muted-foreground">{folder.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default FolderList;
