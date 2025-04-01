import { Button } from '@components/Button';
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
import { createClient } from '@utils/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.from('folders').select();

  return (
    <div className="p-4 flex flex-col gap-4">
      <CreateFolderButton />
      {data?.map(d => <div key={d.id}>{d.name}</div>)}
    </div>
  );
}

const CreateFolderButton = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>폴더 생성</DrawerTitle>
          <DrawerDescription>nest-link를 한곳에 모아서 볼 수 있어요!</DrawerDescription>
        </DrawerHeader>

        <div className="flex justify-center">
          <div className="w-full max-w-[500px] p-4">
            <OriginInput className="" />
          </div>
        </div>

        <div className="flex justify-center">
          <DrawerFooter className="w-full max-w-[500px]">
            <DrawerClose asChild>
              <Button variant="outline">닫기</Button>
            </DrawerClose>
            <Button>저장</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
