"use client";

import { PageLayout, type BreadcrumbItem } from "@/src/ui/PageLayout";
import { Button } from "@/src/ui/Button";
import { IconButton } from "@/src/ui/IconButton";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { InputField } from "@/src/ui/InputField";
import { FormSurface } from "@/src/ui/FormSurface";
import Form from "next/form";

export default function TestButtons() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/app' },
    { label: 'Component Testing', isActive: true }
  ];

  return (
    <PageLayout
      title="Component Testing"
      description="Test and demonstrate UI components and layouts"
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Reset</Button>
          <Button variant="primary">Export</Button>
        </div>
      }
    >

      {/* Enhanced Button Tests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Enhanced Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Custom Style
          </Button>
          <Button isDisabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* IconButton Tests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Button</h2>
        <div className="flex flex-wrap gap-4">
          <IconButton startIcon={<Plus />}>Add Item</IconButton>
          <IconButton endIcon={<TrashBin />}>Delete</IconButton>
          <IconButton iconOnly startIcon={<TrashBin />} />
          <IconButton
            startIcon={<Plus />}
            variant="primary"
            className="bg-green-500 hover:bg-green-600"
          >
            Create
          </IconButton>
          <IconButton iconOnly endIcon={<Plus />} variant="outline" />
        </div>
      </section>

      {/* Back to Home */}
      <div className="mt-8">
        <Button onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>

      {/* Form tests */}
      <div>
        <InputField
          label="Label"
          description="Description"
          errorMessage="Error message"
          className="w-64"
          type=""
          value=""
          onChange={() => {}}
        />
      </div>

      <div>
        <FormSurface className="p-4 w-80" title="Login" variant="transparent">
          <Form action={""}>
            <InputField
              label="Username"
              className="mb-4"
              type="text"
              value=""
              onChange={() => {}}
            />
            <InputField
              label="Password"
              className="mb-4"
              type="password"
              value=""
              onChange={() => {}}
            />
            <Button variant="primary" className="w-full">
              Submit
            </Button>
          </Form>
        </FormSurface>
      </div>
    </PageLayout>
  );
}
