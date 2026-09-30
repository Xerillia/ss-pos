import { Button } from "@/components/ui/button";
import { destroyExpenditure, expenditures } from "@/routes/expenditure";
import { Expenditure } from "@/types/expenditure";
import { Head, router } from "@inertiajs/react";
import ExpenditureTable from "../../components/expenditures/expenditure-table";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteDialog from "@/components/expenditures/delete-dialog";
import { useState } from "react";
import { toast } from "sonner";

interface ShowExpenditureProps {
    expenditure: Expenditure;
}

export default function ShowExpenditure({ expenditure }: ShowExpenditureProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = (id: number) => {
        const toastId = toast.loading("Deleting expenditure...");
        try {
            router.delete(destroyExpenditure(id), {
                onSuccess: () => {
                    toast.success("Expenditure deleted successfully!", {
                        id: toastId,
                    });
                },
                onError: (error) => {
                    toast.error(
                        `${error.message}` || "Error deleting expenditure!",
                        { id: toastId },
                    );
                },
            });
        } catch (error: any) {
            toast.error(`${error.message}` || "Error deleting expenditure!", {
                id: toastId,
            });
        }
    };
    return (
        <>
            <Head title={expenditure.title} />
            <div className="m-4 space-y-4">
                <ButtonGroup className="ml-auto">
                    {/* <Link
                            href={editItem(product)}
                            className={buttonVariants({
                                variant: "outline",
                                size: "sm",
                            })}
                        >
                            <Pencil /> Edit
                        </Link> */}

                    <Button variant="destructive" onClick={() => setOpen(true)}>
                        Delete
                    </Button>
                </ButtonGroup>

                <ExpenditureTable expenditure={expenditure} />
            </div>

            <DeleteDialog
                open={open}
                setOpen={setOpen}
                title={expenditure.title}
                id={expenditure.id}
                handleDelete={handleDelete}
            />
        </>
    );
}

ShowExpenditure.layout = (page: any) => {
    return {
        breadcrumbs: [
            {
                title: "Expenditures",
                href: expenditures(),
            },
            {
                title: page.expenditure.title,
            },
        ],
    };
};
