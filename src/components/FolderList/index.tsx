'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/AlertDialog';
import { Button } from '@components/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/Drawer';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@components/DropdownMenu';
import { OriginInput } from '@components/Input';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

// import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';

const FolderList = () => {
  const supabase = createClient();
  const ref = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const form = useForm();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const { data: folderList } = useQuery({
    queryKey: [queryKeys.FOLDER_LIST],
    queryFn: async () => await supabase.from('folders').select(),
    select: data => data.data,
  });

  const handleUpdate = async () => {
    const { id, name } = form.getValues();
    const { error } = await supabase.from('folders').update({ name }).eq('id', id);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.FOLDER_LIST] });
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    const { error } = await supabase.from('folders').delete().eq('id', deleteTargetId);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.FOLDER_LIST] });
    }
  };

  if (!Array.isArray(folderList) || !folderList?.length) return <></>;

  return (
    <ul className="space-y-2">
      {folderList.map(folder => (
        <li key={folder.id}>
          <Link
            href={`/folder/${folder.id}`}
            className="flex items-center justify-between rounded-md border px-4 py-2 cursor-pointer bg-white hover:bg-gray-50"
            prefetch={false}
          >
            <span className="text-muted-foreground">{folder.name}</span>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left" align="start">
                <DropdownMenuItem
                  onClick={e => {
                    e.preventDefault();
                    form.reset({ id: folder.id, name: folder.name });
                    ref.current?.click();
                  }}
                >
                  <Pen />
                  <span>수정</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={e => {
                    e.preventDefault();
                    setDeleteTargetId(folder.id);
                    deleteRef.current?.click();
                  }}
                >
                  <Trash2 />
                  <span>삭제</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </Link>
        </li>
      ))}

      <Drawer>
        <DrawerTrigger ref={ref} />
        <FormProvider {...form}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>폴더 수정</DrawerTitle>
            </DrawerHeader>

            <div className="flex justify-center">
              <div className="w-full max-w-[500px] p-4">
                <OriginInput className="" {...form.register('name', { required: true })} />
              </div>
            </div>

            <div className="flex justify-center">
              <DrawerFooter className="w-full max-w-[500px]">
                <DrawerClose asChild>
                  <Button variant="outline">닫기</Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button onClick={handleUpdate}>저장</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </FormProvider>
      </Drawer>

      <AlertDialog>
        <AlertDialogTrigger ref={deleteRef} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>폴더 삭제</AlertDialogTitle>
            <AlertDialogDescription>폴더를 정말로 삭제하시겠습니까?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ul>
  );
};

export default FolderList;
