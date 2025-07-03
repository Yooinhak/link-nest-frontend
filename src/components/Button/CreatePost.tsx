'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/Drawer';
import { OriginInput } from '@components/Input';
import Label from '@components/Label';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

import { Button } from '.';

const Component = ({ folderId }: { folderId: string }) => {
  const form = useForm();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = async () => {
    const data = form.getValues();

    const { error } = await supabase
      .from('posts')
      .insert({ url: data.url, description: data.description, folder_id: Number(folderId) });

    if (!error) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POST_LIST, folderId] });
      setOpen(false);
    } else {
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" onClick={() => form.reset()}>
          게시글 생성
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>게시글 생성</DrawerTitle>
          </DrawerHeader>

          <FormProvider {...form}>
            <div className="flex justify-center">
              <div className="w-full max-w-[500px] p-4 flex flex-col gap-2">
                <Label htmlFor="post_url">url</Label>
                <OriginInput
                  id={'post_url'}
                  placeholder="https://"
                  className="mb-1"
                  {...form.register('url', { required: true })}
                />
                <Label htmlFor="post_description">설명</Label>
                <OriginInput id="post_description" {...form.register('description')} />
              </div>
            </div>
          </FormProvider>

          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <Button onClick={handleCreate}>저장</Button>
              <DrawerClose asChild>
                <Button variant="outline">닫기</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Component;
