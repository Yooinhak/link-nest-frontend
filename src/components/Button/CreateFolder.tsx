'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/Drawer';
import { OriginInput } from '@components/Input';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

import { Button } from '.';

const Component = () => {
  const form = useForm();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    const data = form.getValues();

    const { error } = await supabase.from('folders').insert({ name: data.name });

    if (!error) {
      queryClient.invalidateQueries({ queryKey: [queryKeys.FOLDER_LIST] });
      setOpen(false);
    } else {
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" onClick={() => form.reset()}>
          폴더 생성
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>폴더 생성</DrawerTitle>
            <DrawerDescription>nest-link를 한곳에 모아서 볼 수 있어요!</DrawerDescription>
          </DrawerHeader>

          <FormProvider {...form}>
            <div className="flex justify-center">
              <div className="w-full max-w-[500px] p-4">
                <OriginInput className="" {...form.register('name', { required: true })} />
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
