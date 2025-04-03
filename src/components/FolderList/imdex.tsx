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
    <ul>
      {folderList.map(folder => (
        <li key={folder.id}>
          <span>{folder.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default FolderList;
