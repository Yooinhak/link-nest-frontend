'use client';

import { Button } from '@components/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/DropdownMenu';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';
import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';

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
          className="flex items-center justify-between rounded-md border px-4 py-2 cursor-pointer bg-white"
        >
          <span className="text-muted-foreground">{folder.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" align="start">
              <DropdownMenuItem onClick={() => console.log('수정하기')}>
                <Pen />
                <span>수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 />
                <span>삭제</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
};

export default FolderList;
